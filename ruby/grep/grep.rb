module Grep
    def self.grep(pattern, flags, files)
        output = ""

        files.each do |text| 
            file = File.open(text)
            file.readlines.each_with_index do |line, index|

                # identify which flags that influence the matching have been included
                # and create boolean values for each of them
                case_insensitive = flags.include? "-i"
                full_line = flags.include? "-x"
                invert = flags.include? "-v"

                does_match = find_matches(pattern, line, case_insensitive, full_line, invert) 

                # identify what additional information to include in the output
                file_name = (flags.include? "-l") ? text : nil
                line_num = (flags.include? "-n") ? index + 1 : nil

                if does_match
                    to_append = edit_output(line, file_name, line_num)
                    
                    if !output.include? to_append # we don't want double entries of information
                        output << "#{text}:" if files.length > 1 && !flags.include?("-l")
                        output << to_append
                    end
                end
            end
        end

        return output.rstrip # we need to remove any stray newlines that may have appeared during the iteration process
    end

    def self.find_matches(pattern, line, case_insensitive, full_line, invert)
        # we have to clone the passed in strings so we can modify them without affecting their values outside the function
        test_pattern = pattern.clone
        test_line = line.clone

        if case_insensitive
            test_pattern.downcase!
            test_line.downcase!
        end
        
        match_found = false

        if !full_line && test_line.include?(test_pattern)
            match_found = true
        elsif full_line && test_line.rstrip == test_pattern
            match_found = true
        end

        match_found = invert ? !match_found : match_found

        return match_found
    end

    def self.edit_output(matching_line, file_name, line_num)
        if file_name
            return file_name + "\n"
        elsif line_num
            return "#{line_num}:#{matching_line}"
        else
            return matching_line
        end
    end
end
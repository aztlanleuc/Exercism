=begin
Write your code for the 'Grep' exercise in this file. Make the tests in
`grep_test.rb` pass.

To get started with TDD, see the `README.md` file in your
`ruby/grep` directory.
=end

module Grep
    def self.grep(pattern, flags, files)
=begin
        ok so last time this worked by handling the various flags in batches
            - way the matching is done: case insensitive & full line => outputs boolean
            - invert the match => outputs boolean
            - modify the output: line names or files only => outputs string
=end

        output = ""

        files.each do |text| 
            file = File.open(text)
            file.readlines.each_with_index do |line, index|
                # print "\n#{index + 1}:"

                case_insensitive = flags.include? "-i"
                full_line = flags.include? "-x"
                invert = flags.include? "-v"

                does_match = find_matches(pattern, line.clone, case_insensitive, full_line, invert)

                f_name = (flags.include? "-l") ? text : nil
                l_num = (flags.include? "-n") ? index + 1 : nil

                if does_match
                    to_append = edit_output(line, f_name, l_num)
                    
                    if !output.include? to_append
                        output << "#{text}:" if files.length > 1 && !flags.include?("-l")
                        output << to_append
                    end
                end
            end
        end

        return output.rstrip
    end

    def self.find_matches(pattern, line, case_insensitive, full_line, invert) # this function will also need to handle inversions i think
        line_original = line.clone

        if case_insensitive
            pattern.downcase!
            line.downcase!
        end
        
        match_found = false

        # puts "line: #{line}\npattern: #{pattern}"

        if !full_line && line.include?(pattern)
            # puts "match found"
            match_found = true
        elsif full_line && line.rstrip == pattern
            # puts "match found"
            match_found = true
        end

        match_found = invert ? !match_found : match_found

        return match_found
    end

    def self.edit_output(matching_line, file_name, line_num)
        # puts "file name: #{file_name}, line num: #{line_num}"

        unless matching_line == ""
            if file_name
                # puts "file names only"
                return file_name + "\n"
            elsif line_num
                # puts "include line numbers"
                return "#{line_num}:#{matching_line}"
            else
                # puts "just the line"
                return matching_line
            end
        else return ""
        end
    end
end
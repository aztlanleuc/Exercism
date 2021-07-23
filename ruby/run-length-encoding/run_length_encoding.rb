module RunLengthEncoding
    def self.encode(input)
=begin
            take the first letter
            continue until you find a letter that is not the first letter and store that location
            work out how many letters matched and add to the encoding string
            repeat
=end

        encoded_version = ""

        if input.length == 0
            return ""
        end

        for i in 0..input.length - 1 
            # puts "----------"

            # puts "#{input[i]} => #{input[i + 1]}"

            current_letter ||= input[i]
            sequence_start ||= i
            # puts "we are counting #{current_letter}'s and they started at #{sequence_start}"

            if input[i] != input[i + 1]
                # puts "they don't match"

                count = i + 1 - sequence_start
                unless count == 1
                    encoded_version << "#{count}#{current_letter}"
                else
                    encoded_version << current_letter
                end
                


                current_letter = nil
                sequence_start = nil
            end
        end

        # puts encoded_version

        return encoded_version
    end
end

RunLengthEncoding.encode("XYZ")
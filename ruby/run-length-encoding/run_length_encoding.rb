module RunLengthEncoding
    def self.encode(input)
        encoded_version = ""

        for i in 0..input.length - 1 
            current_letter ||= input[i]
            sequence_start ||= i

            if input[i] != input[i + 1]
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

        return encoded_version
    end
    def self.decode(input)
        pattern = /\d*[A-z ]/
        
        match_data = input.scan(pattern)

        output_string = ""

        match_data.each do |elem|
            letter = elem[-1]
            number = elem[0...-1].to_i

            unless number == 0
                number.times { output_string << letter }
            else 
                output_string << letter
            end
        end

        return output_string
    end
end
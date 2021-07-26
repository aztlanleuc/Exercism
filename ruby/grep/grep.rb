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
            output << find_matches(pattern, file)
        end

        return output.rstrip
    end

    def self.find_matches(pattern, text)
        output = ""

        text.readlines.each_with_index do |line, index|
            puts "#{index}: #{line}"

            if line.include? pattern
                puts "match found"
                output << line
            end
        end

        puts output

        return output
    end
end
=begin
Write your code for the 'Robot Name' exercise in this file. Make the tests in
`robot_name_test.rb` pass.

To get started with TDD, see the `README.md` file in your
`ruby/robot-name` directory.
=end

module Robot
    def self.forget
        Robots::regenerate_names
    end

    class Robots
        attr_reader :name

        def initialize
            regenerate_names unless @@available_names # generate the available names if they don't already exist
            @name = generate_name
        end

        def generate_name
            index = rand(@@available_names.length)

            name = @@available_names[index]

            @@available_names.delete_at(index)

            name
        end

        def reset
            @@available_names.push(@name)

            @name = generate_name
        end

        def self.regenerate_names
            letters = ("A".."Z").to_a.repeated_permutation(2).to_a
            letter_combos = letters.map { |element| element.join("") }

            numbers = (0..9).to_a.repeated_permutation(3).to_a
            number_combos = numbers.map { |element| element.join("") }

            valid_name_arrays = letter_combos.product(number_combos)

            valid_names = valid_name_arrays.map { |elem| elem.join("") }

            @@available_names = valid_names
        end
    end

    def self.new
        return Robots.new
    end
end


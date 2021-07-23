=begin
Write your code for the 'Robot Name' exercise in this file. Make the tests in
`robot_name_test.rb` pass.

To get started with TDD, see the `README.md` file in your
`ruby/robot-name` directory.
=end

module Robot
    def self.forget
        # do nothing
        puts "\n--------------------"
    end

    class Robots 
        @@taken_names = []

        attr_reader :name

        def initialize
            @name = generate_name
        end

        def generate_name
            letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

            name = ""
            loop do
                name = letters[rand(26)] + letters[rand(26)] + rand(100..1000).to_s
                # puts name
                break if !@@taken_names.include? name
            end

            @@taken_names.push name

            name
        end

        def reset
            @@taken_names.delete(@name)

            @name = generate_name
        end
    end

    def self.new
        return Robots.new
    end
end


robot = Robot::Robots.new

robot.generate_names
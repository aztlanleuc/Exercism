=begin
Write your code for the 'Luhn' exercise in this file. Make the tests in
`luhn_test.rb` pass.

To get started with TDD, see the `README.md` file in your
`ruby/luhn` directory.
=end

module Luhn
  def self.calculate_checksum(input)
    digit_array = input.split('')
    reverse_digits = digit_array.reverse!

    digits_to_sum = []

    reverse_digits.each_with_index do |digit, index|
      num = digit.to_i

      if index.even?
        doubled = num * 2
        if doubled > 9
          digits = doubled.digits
          doubled = digits[0] + digits[1]
        end
        digits_to_sum.push(doubled)
      else
        digits_to_sum.push(num)
      end
    end

    sum = 0

    digits_to_sum.each { |num| sum += num }

    checksum = (sum * 9) % 10

    output_string = input.to_s << checksum.to_s
  end

  def self.valid?(input)
    stripped_input = input.gsub(/\s+/, "")


    if stripped_input.length == 1
        return false
    end

    if stripped_input =~ /\D+/
        return false
    end

    valid_checksum = calculate_checksum(stripped_input[0, stripped_input.length - 1])

    if valid_checksum == stripped_input
      return true
    else
      return false
    end
  end
end

puts Luhn.calculate_checksum '0'

puts Luhn.valid? '0'

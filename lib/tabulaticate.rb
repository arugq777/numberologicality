class Tabulaticate

  @@master_numbers = [11, 22, 33]

  def self.parse(name)
    @total_count, @vowel_count, @consonant_count = Hash.new(0), Hash.new(0), Hash.new(0)
    @l = Letter.new("")

    n = name.downcase.delete(" ").split(//).map {|i| i.to_sym}
    n.each_index do |i|
      @l.letter = n[i]
      if @l.is_letter?
        @total_count[ @l.letter ] += 1
        if @l.is_vowel?
          unless n[i-1] == "!".to_sym
            @vowel_count[ @l.letter ] += 1
          else
            @consonant_count[ @l.letter ] += 1
          end 
        elsif @l.is_consonant?
          unless n[i-1] == "!".to_sym
            @consonant_count[ @l.letter ] += 1
          else
            @vowel_count[ @l.letter ] += 1
          end
        end
      end 
    end
  end

  def self.tabulate(count_hash)
    count_hash.each_key do |key|
      l = Letter.new(key)
      if l.is_letter?
        count_hash[key] *= l.value
      end
    end
    total = 0
    count_hash.each_value {|val| total += val}
    return reduce(total)
  end

  def self.reduce(number)
    reduced = [number]
    if @@master_numbers.include?(number)
      return reduced
    else
      loop do 
        sum = 0
        reduced.last.to_s.split(//).each {|num_char| sum += num_char.to_i}
        reduced << sum
        break if (reduced.last < 10 || @@master_numbers.include?(reduced.last))
      end
      return reduced
    end
  end

  def self.calculate_life_path(date)
    d, m, y = reduce(date.day), reduce(date.mon), reduce(date.year)
    total = d.last + m.last + y.last
    return reduce(total)
  end

  def self.calculate_name(name)
    name_numbers = {}
    parse(name)

    #different sources call the same numbers different things
    #name number/expression number/destiny number
    name_numbers[:"Expression"] = tabulate(@total_count)
    
    #soul number/heart's desire number
    name_numbers[:"Soul"] = tabulate(@vowel_count)
    
    #personality number/persona number
    name_numbers[:"Persona"] = tabulate(@consonant_count)
    return name_numbers
  end

  #TODO: Other numbers--easy to implement, but they can wait.
  #      Listed here so I don't have to look up the formulas
  #      again
  #
  #  Maturity number: expression + life path
  #
  #  Challenge numbers: 
  #    1) bmonth - bday
  #    2) byear - bday
  #    3) 1st challenge - 2nd challenge
  #    4) byear - bmonth
  #
  #  Pinnacles: 
  #    1) bday + bmonth
  #    2) bday + byear
  #    3) 1st pinnacle + 2nd pinacle
  #    4) bmonth + byear

  def self.process(person)
    person.numbers[:main] = calculate_name(person.name)
    person.numbers[:main][:"Life Path"] = calculate_life_path(person.birthday)
  end
end
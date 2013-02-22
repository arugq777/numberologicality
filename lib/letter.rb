class Letter
  attr_accessor :letter

  @@vowels = [ :a, :e, :i, :o, :u ]

  @@all = ('a'..'z').map {|letter| letter.to_sym }

  @@value = {}
  (1..9).each {|i| @@value[i] = []}

  #Fill @@value's arrays with appropriate letters
  @@all.each_index do |i|
    num = ( i + 1 ) % 9
    unless num == 0
      @@value[num] << @@all[i]
    else
      @@value[9]   << @@all[i]
    end
  end

  def initialize(letter)
    @letter = letter.to_sym
  end

  def is_letter?
    return @@all.include?( @letter )
  end

  def is_consonant?
    if self.is_letter?
      return @@vowels.include?( @letter ) ? false : true
    else
      return false
    end
  end

  def is_vowel?
    if self.is_letter?
      return @@vowels.include?( @letter ) ? true : false
    else
      return false
    end
  end

  def value
    @@value.each do |key, value|
      return key if value.include?(@letter)
    end
  end
end
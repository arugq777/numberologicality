require_relative "../numberologicality_console.rb"

describe Person do
  before(:each) do
    @p = Person.new("Timmay","1/1/1111")
  end
  it "has a name" do 
    @p.raw_name_input.should == "Timmay"
    @p.name.should == "Timmay"
    Person.new("","").should respond_to :name
    Person.new("","").should respond_to :raw_name_input
  end

  it "has a valid name" do
    p = Person.new("23452345345@%@#$%@#$%Timmay", "1/1/1111")
    p.name.should == "Timmay"
  end

  it "has a birthday" do 
    @p.raw_date_input.should == "1/1/1111"
    @p.birthday.should == Date.parse("1/1/1111")
    Person.new("","").should respond_to :birthday
    Person.new("","").should respond_to :raw_date_input
  end

  it "defaults to current date, given invalid input" do
    p = Person.new("", "sdfsdgsdfgsdfg")
    p.birthday.should == Date.today
  end

  it "has numbers" do
    p = Person.new("Timmay", "1/1/1111")
    Tabulaticate.process(p)
    @p.numbers.should == p.numbers
    @p.numbers[:birthdate].last.should == 6
    Person.new("","").should respond_to :numbers
  end

end

describe Letter do
  before(:each) do
    @c1 = Letter.new("a")
    # @c2 = Letter.new("!a")
    @c3 = Letter.new("b")
    # @c4 = Letter.new("!b")
    @c5 = Letter.new("#")
  end

  it "should be a valid letter" do
    @c1.is_letter?.should == true
    @c3.is_letter?.should == true
    @c5.is_letter?.should == false
  end

  it "should distinguish between consonants and vowels" do
    @c1.is_vowel?.should == true
    @c3.is_vowel?.should == false
    @c5.is_vowel?.should == false
    @c1.is_consonant?.should == false
    @c3.is_consonant?.should == true
    @c5.is_consonant?.should == false
  end

  it "should switch between consonant and vowel, when preceded by '!'" do
    

end
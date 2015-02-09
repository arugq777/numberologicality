require_relative "./spec_helper"

describe Person do
  before(:each) do
    @p = Person.new("Timmay","1/1/1111")
  end
  it "has a name" do 
    @p.raw_name_input.should == "Timmay"
    @p.name.should == "Timmay"
    Person.new("","").should respond_to :name
    Person.new("","").should respond_to :raw_name_input

    expect(@p.name).to eql "Timmay"
    expect(Person.new("","")).to respond_to :name
    expect(Person.new("","")).to respond_to :raw_name_input
  end

  it "has a valid name" do
    p = Person.new("23452345345@%@#$%@#$%Timmay", "1/1/1111")
    p.name.should == "Timmay"
    
    expect(p.name).to eql("Timmay")
  end

  it "has a birthday" do 
    @p.raw_date_input.should == "1/1/1111"
    @p.birthday.should == Date.parse("1/1/1111")
    Person.new("","").should respond_to :birthday
    Person.new("","").should respond_to :raw_date_input

    expect(@p.raw_date_input).to eq "1/1/1111"
    expect(@p.birthday.should).to eq Date.parse("1/1/1111")
    expect(Person.new("","")).to respond_to :birthday
    expect(Person.new("","")).to respond_to :raw_date_input
  end

  it "defaults to current date, given invalid input" do
    p = Person.new("", "sdfsdgsdfgsdfg")
    p.birthday.should == Date.today

    expect(p.birthday).to eql(Date.today)
  end

  it "has numbers" do
    p = Person.new("Timmay", "1/1/1111")
    Tabulaticate.process(p)
    @p.numbers.should == p.numbers
    @p.numbers[:birthdate].last.should == 6
    Person.new("","").should respond_to :numbers

    expect(@p.numbers).to eq(p.numbers)
    expect(@p.numbers[:birthdate].last).to eql(6)
    expect(Person.new("","")).to respond_to :numbers
  end

end

describe Letter do
  before(:each) do
    @c1 = Letter.new("a")
    @c3 = Letter.new("b")
    @c5 = Letter.new("#")
  end

  it "should be a valid letter" do
    @c1.is_letter?.should == true
    @c3.is_letter?.should == true
    @c5.is_letter?.should == false

    expect(@c1.is_letter?).to be true
    expect(@c3.is_letter?).to be true
    expect(@c5.is_letter?).to be false
  end

  it "should distinguish between consonants and vowels" do
    @c1.is_vowel?.should == true
    @c3.is_vowel?.should == false
    @c5.is_vowel?.should == false
    @c1.is_consonant?.should == false
    @c3.is_consonant?.should == true
    @c5.is_consonant?.should == false

    expect(@c1.is_vowel?).to be true  
    expect(@c3.is_vowel?).to be false 
    expect(@c5.is_vowel?).to be false 
    expect(@c1.is_consonant?).to be false
    expect(@c3.is_consonant?).to be true
    expect(@c5.is_consonant?).to be false      
  end

  it "should switch between consonant and vowel, when preceded by '!'" do
    @c2 = Tabulaticate::parse("!a")
    @c4 = Tabulaticate::parse("!b")

    expect(@c2[:consonants].count).to eql 1
    expect(@c2[:vowels].count).to eql 0
    expect(@c4[:consonants].count).to eql 0
    expect(@c4[:vowels].count).to eql 1    
  end
end

class CreateNumnuts < ActiveRecord::Migration
  def change
    create_table :numnuts do |t|
      t.date    :birthday
      t.string  :raw_date_input
      t.string  :name
      t.string  :raw_name_input
      t.integer :whole_name, :array => true, :length => 3
      t.integer :vowel,      :array => true, :length => 3
      t.integer :consonant,  :array => true, :length => 3
      t.integer :birthdate,  :array => true, :length => 3
    end
  end
end

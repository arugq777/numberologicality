class AddMetadataColumns < ActiveRecord::Migration
  def change
  	add_column :numnuts, :ip,         :string
  	add_column :numnuts, :user_agent, :string
  	add_column :numnuts, :post_data,  :string
  end
end

require 'rails_helper'

feature 'visitor registers as new user' do
  scenario 'user sees sign up button on home page' do
    pending
    visit root_path

    expect(page).to have_content 'Sign up'
  end

  scenario 'user sucessfully fills out registration form' do
    visit new_user_registration_path

    fill_in 'First Name', with: 'John'
    fill_in 'Last Name', with: 'Smith'
    fill_in 'Email', with: 'john@firstenglishcolony.edu'
    fill_in 'Password', with: 'pocahontas'
    fill_in 'Password Confirmation', with: 'pocahontas'

    click_button 'Sign up'

    expect(current_path).to eq '/'
  end

  scenario 'user unsucessfully fills out registration form' do
    visit new_user_registration_path
    click_button 'Sign up'

    expect(page).to have_content "Email can't be blank"
    expect(page).to have_content "Password can't be blank"
    expect(page).to have_content "First name can't be blank"
    expect(page).to have_content "Last name can't be blank"
  end

  scenario 'user edits their account' do
    user = User.create(
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@firstenglishcolony.edu',
      password: 'pocahontas'
    )

    login_as(user, scope: :user)

    visit edit_user_registration_path

    expect(page).to have_content 'Edit'
    expect(find_field('First Name').value).to eq 'John'
    expect(find_field('Last Name').value).to eq 'Smith'
    expect(find_field('Email').value).to eq 'john@firstenglishcolony.edu'
  end
end

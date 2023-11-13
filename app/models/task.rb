class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, :description, :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task do
    event :begin_develop do
      transition new_task: :in_development
    end

    event :begin_test do
      transition in_development: :in_qa
    end

    event :return_in_development do
      transition [:in_qa, :in_code_review] => :in_development
    end

    event :start_review do
      transition in_qa: :code_review
    end

    event :prepare_for_release do
      transition code_review: :ready_to_release
    end

    event :release do
      transition ready_to_release: :released
    end

    event :archive do
      transition [:new_task, :released] => :archived
    end
  end
end

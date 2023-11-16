class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, :description, :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task  do
    STATE_NEW_TASK = :new_task
    STATE_IN_DEVELOPMENT = :in_development
    STATE_IN_QA = :in_qa
    STATE_IN_CODE_REVIEW = :in_code_review
    STATE_READY_TO_RELEASE = :ready_to_release
    STATE_RELEASED = :released
    STATE_ARCHIVED = :archived

    event :start_develop do
      transition STATE_NEW_TASK => STATE_IN_DEVELOPMENT
    end

    event :start_test do
      transition STATE_IN_DEVELOPMENT => STATE_IN_QA
    end

    event :return_to_development do
      transition [STATE_IN_QA, STATE_IN_CODE_REVIEW] => STATE_IN_DEVELOPMENT
    end

    event :start_review do
      transition STATE_IN_QA => STATE_IN_CODE_REVIEW
    end

    event :prepare_for_release do
      transition STATE_IN_CODE_REVIEW => STATE_READY_TO_RELEASE
    end

    event :release do
      transition STATE_READY_TO_RELEASE => STATE_RELEASED
    end

    event :archive do
      transition [STATE_NEW_TASK, STATE_RELEASED] => STATE_ARCHIVED
    end
  end
end

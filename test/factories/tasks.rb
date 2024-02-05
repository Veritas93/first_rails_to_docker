FactoryBot.define do
  factory :task do
    name
    description
    author { create :user }
    assignee { create :user }
    traits_for_enum(:state,
                    [Task::STATE_NEW_TASK, Task::STATE_IN_DEVELOPMENT, Task::STATE_IN_QA, Task::STATE_IN_CODE_REVIEW,
                     Task::STATE_READY_TO_RELEASE, Task::STATE_RELEASED, Task::STATE_ARCHIVED])
    expired_at
  end
end

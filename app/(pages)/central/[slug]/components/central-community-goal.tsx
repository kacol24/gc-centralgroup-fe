import React from 'react';

interface CentralCommunityGoalProps {
  goals?: Goal[];
}

interface Goal {
  title: string;
  description: string;
}

export default function CentralCommunityGoal({ goals }: CentralCommunityGoalProps) {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-12 md:flex md:gap-12 md:items-stretch  lg:py-20 lg:gap-24">
        {goals &&
          goals.map((goal, index) => (
            <React.Fragment key={index}>
              <div className="mx-12 text-center md:mx-0">
                <h3 className="mb-6 text-2xl  text-primary font-marcellus">{goal.title}</h3>
                <p className="text-textSecondary font-medium">{goal.description}</p>
              </div>

              {index < goals.length - 1 && (
                <>
                  <hr className="mx-8 my-[40px] md:hidden" />
                  <div className="hidden md:block w-[1px] bg-gray-300"></div>
                </>
              )}
            </React.Fragment>
          ))}
      </div>
    </section>
  );
}

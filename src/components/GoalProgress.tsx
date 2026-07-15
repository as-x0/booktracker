interface GoalProgressProps {

    current: number

    target: number

}


function GoalProgress({
                          current,
                          target
                      }: GoalProgressProps) {


    const percentage =
        (current / target) * 100


    return (

        <div>

            <p>
                {current} / {target} books
            </p>


            <progress
                value={percentage}
                max="100"
            />

        </div>

    )

}


export default GoalProgress
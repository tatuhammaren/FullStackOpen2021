interface Result {
    period: number,
    trainedDays: number,
    success: boolean,
    rating: number,
    ratingDesc: string,
    target: number,
    avgHours: number
}
interface ExInputValues {
    exercises: number[],
    target: number
}
const parseExArgs = (args: Array<string>): ExInputValues => {
    if (args.length < 6) throw new Error('Not enough arguments');
	if (args.length > 13) throw new Error('Too many arguments');
    const argsAsStrings = args.slice(3)
    const argsToNumbers = argsAsStrings.map(Number)
    
	if ((Number(args[2]))) {
	  return {
		exercises: argsToNumbers,
		target: Number(args[2])
	  }
	}

}
function calculateExercises(exercises: number[], target: number): Result {
    const period = exercises.length
    const trainedDays = exercises.filter((trained) => trained > 0).length
    const avgHours = exercises.reduce((x, y) => x + y, 0) / period
    const success = avgHours >= target ? true : false

    return {
        period,
        trainedDays,
        success,
        rating: 0,
        ratingDesc: 'not too bad but could be better',
        target,
        avgHours
    }
}


try {
	const {target, exercises} = parseExArgs(process.argv)
	console.log(
		calculateExercises(exercises, target)
	);
	
} catch (error: unknown) {
	let errorMsg = 'oh no.'
	if(error instanceof Error) {
		errorMsg += ' error: ' + error.message
	}
	console.log(errorMsg);
	
}
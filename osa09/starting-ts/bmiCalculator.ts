interface BMIInputValues {
	height: number,
	weight: number
}

const parseBMIArgs = (args: Array<string>): BMIInputValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');
  
	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
	  return {
		height: Number(args[2]),
		weight: Number(args[3])
	  }
	}
}
function calculateBMI(height:number, weight: number): String {
		const bmi: number = (weight / (Math.pow((height /100), 2)))
		if(bmi < 18.5) return `Your BMI is ${bmi} (Underweight)`
		if(bmi < 25) return `Your BMI is ${bmi} (Normal Weight)`
		if (bmi < 30) return `Your BMI is ${bmi} (Overweight)`
		return `Your BMI is ${bmi.toFixed(1)} (Obese)`

}

try {
	const {height, weight} = parseBMIArgs(process.argv)
	console.log(
		calculateBMI(height, weight)
	);
	
} catch (error: unknown) {
	let errorMsg = 'oh no.'
	if(error instanceof Error) {
		errorMsg += ' error: ' + error.message
	}
	console.log(errorMsg);
	
}


/* interface BMIInputValues {
	height: number,
	weight: number
} 

interface output {
	height: number,
	weight: number,
	bmi: string
} */

/* const parseBMIArgs = (args: Array<string>): BMIInputValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');
  
	if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
		throw new Error("Values are not numbers")
	}
	return {
		height: Number(args[2]),
		weight: Number(args[3])
	  }
} */
export function calculateBMI(height:number, weight: number): string {
		const bmi: number = (weight / (Math.pow((height /100), 2)));
		if(bmi < 18.5) return `Underweight`;
		if(bmi < 25) return `Normal Weight`;
		if (bmi < 30) return `Overweight`;
		return `Obese`;

}

/* try {
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
	
} */


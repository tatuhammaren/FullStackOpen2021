import express from 'express';
import {calculateBMI} from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const port = 3000;
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res): void => {
    const {height, weight} = req.query;

    if(isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({error: 'invalid input'});
    } else {
        
        const bmi = calculateBMI(Number(height), Number(weight));
        
        res.send({height, weight, bmi});
    }

});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseNumbers(array: any[]): number[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return array.map(a => parseFloat(a));
} 

app.get('/exercises', (req, res)=>  {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {daily_exercises, target} = req.body;
        if( !daily_exercises && !target || !daily_exercises || !target) {
            return res.status(400).send({"error": "parameters missing"});
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const parsed = parseNumbers(daily_exercises);
        if(!Number(target) || parsed.some(isNaN)) {
            return res.status(400).send({"error": "malformatted parameters"});
        }
        else {
        const data = calculateExercises(parsed, Number(target));
        return res.send(data);
        }
});
app.listen(port, () => {
    console.log('app running on port 3000');
    
});

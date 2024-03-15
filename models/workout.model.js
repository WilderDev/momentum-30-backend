const mongoose = require("mongoose");
const Exercise = require("./Exercise.model");

const UserWorkoutSchema = new mongoose.Schema(
	{
		userID: {
			type: String,
		},
		exercises: {
			type: Array,
		},
		completedOn: {
			type: Date,
		},
		success: {
			type: Boolean,
		},
		workoutExp: {
			type: Number,
		},
	},
	{ timestamps: true }
);

UserWorkoutSchema.methods.generateExercisesList = async function (
	numExercises,
	user
) {
	this.exercises = [];
	const usedIndexes = new Set();
	const usedTargetedAreas = new Set();
	const allExercises = await Exercise.find({});
	while (this.exercises < numExercises) {
		const randNum = Math.floor(Math.random() * allExercises.length);
		if (!usedIndexes.has(randNum)) {
			if (!usedTargetedAreas.has(allExercises[randNum].targetedArea)) {
				if (user.experience <= 10) {
					if (allExercises[randNum].challengeRating === 1) {
						this.exercises.push(allExercises[randNum]);
					}
				} else if (user.experience > 10 && user.experience <= 20) {
					if (
						allExercises[randNum].challengeRating === 1 &&
						allExercises[randNum].challengeRating === 2
					) {
						this.exercises.push(allExercises[randNum]);
					}
				} else {
					if (
						allExercises[randNum].challengeRating === 1 &&
						allExercises[randNum].challengeRating === 2 &&
						allExercises[randNum].challengeRating === 3
					) {
						this.exercises.push(allExercises[randNum]);
					}
				}

				usedTargetedAreas.add(this.allExercises[randNum].targetedArea);
			}
			usedIndexes.add(randNum);
		}
	}
	this.workoutExp = this.exercises.reduce(
		(acc, exerciseReps) =>
			acc + exerciseReps.exercise.experience * exerciseReps.reps
	);
};

UserWorkoutSchema.methods.completeWorkout = function () {
	this.success = true;
	this.completedOn = new Date(Date.now());
	return workoutExp;
};

UserWorkoutSchema.methods.endWorkoutEarly = function () {
	this.success = false;
	this.completedOn = new Date(Date.now());
	return workoutExp * -0.5;
};

module.exports = mongoose.model("UserWorkout", UserWorkoutSchema);

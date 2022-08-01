import React from "react";

const Course = (props) => {
	const { name, parts } = props.course;
	return (
		<div>
			<Header course={name} />
			<Content parts={parts} />
			<Total total={parts} />
		</div>
	);
};
const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ total }) => {
	const Amount = () => {
		const totalAmount = total.reduce(function (sum, parts) {
			return sum + parts.exercises;
		}, 0);
		return totalAmount;
	};
	return <b> total of exercises {Amount()} </b>;
};

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</>
	);
};

export default Course;

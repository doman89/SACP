import React from 'react';
import { Window } from './../Window/Window';
import { WithWindowContext } from '../../contexts/WindowContext/interfaces/WithWindowContext';
import { withWindowContext } from '../../contexts/WindowContext/withWindowContext';

interface AboutUsProps extends WithWindowContext{
	contentOf: string;
	leftPosition: number;
	topPosition: number;
}

const AboutUs: React.FC<AboutUsProps> = (props) => {
	if (props.context.websiteData === null) {
		return null;
	}

	const { aboutUs } = props.context.websiteData;

	return (
		<Window {...props}>
			<div style={{width: '800px'}}>
				{aboutUs.sectionDescription}
				<ul>
					{aboutUs.members.map(member => (
						<li key={member.nickname}>
							<p>
								{member.nickname}
							</p>
							<div>
								<img alt={member.nickname} src={member.photo} />
							</div>
							<ul>
								{member.equipment.map(thing => <li key={thing}>{thing}</li>)}
							</ul>
							<ul>
								{member.hobbies.map(hobby => <li key={hobby}>{hobby}</li>)}
							</ul>
							<p>
								{member.contact}
							</p>
						</li>
					))}
				</ul>
			</div>
		</Window>
	)
};

const AboutUsConsumer = withWindowContext(AboutUs);

export { AboutUsConsumer as AboutUs };


import React from 'react';

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({title}) => <div className="title">{title}</div>;

export default Title;

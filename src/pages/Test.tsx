import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background_2.jpg';

interface WordData {
  english: string;
  korean: string;
}

const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const allWords: WordData[] = location.state?.words || [];

  return <div>Test</div>;
};

export default Test;

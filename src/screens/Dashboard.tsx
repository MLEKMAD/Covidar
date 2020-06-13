import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Covidar</Header>
    <Button mode="contained" onPress={() => navigation.navigate('SurveyScreen')}>
      Take Infection test
    </Button>
    <Button mode="contained" onPress={() => navigation.navigate('MapScreen')}>
      Check infection map
    </Button>
    <Button mode="contained" onPress={() => navigation.navigate('Statistics')}>
      Statistics
    </Button>
  </Background>
);

export default memo(Dashboard);

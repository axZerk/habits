import React from 'react';
import Sidebar from '../DashboardSidebar';
import HabitsHategoriesList from '../HabitsHategoriesList';

const DashboardPage = () => (
  <div>
    <Sidebar>
      <HabitsHategoriesList />
    </Sidebar>
  </div>
);

export default DashboardPage;

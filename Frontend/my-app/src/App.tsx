import { AppProvider, PageContainer, PageContainerToolbar } from "@toolpad/core";
import { Game } from "./Game";

const PageToolbar = () => {
  return (
    <PageContainerToolbar>
      <div>Experiments in building a simple rogue-lite in a virtual ecosystem</div>
    </PageContainerToolbar>
  );
}

const App = () => {

return ( 
  <AppProvider
    branding={{ title: 'Rogue Vivarium' }}>
    <PageContainer slots={{ toolbar: PageToolbar}}>
      <Game /> 
      <div> Controls: WASD to move</div>
    </PageContainer>
  </AppProvider>
);
}

export default App;

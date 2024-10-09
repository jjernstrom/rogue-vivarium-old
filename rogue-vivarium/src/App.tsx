import { AppProvider, PageContainer, PageContainerToolbar } from "@toolpad/core";
import { AppProvider as PixiAppProvider, Stage, useApp }  from "@pixi/react";
import { Game } from "./components";
import { MapAnimation } from "./components/MapAnamation";
import { ProceduralDemo } from "./components/ProceduralMapGen/ProceduralDemo";

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
      {/* <Game />  */}
      {/* <MapAnimation /> */}
      <Stage height={500} width={500} >
        <ProceduralDemo />
      </Stage>
      <div> Controls: WASD to move</div>
    </PageContainer>
  </AppProvider>
);
}

export default App;

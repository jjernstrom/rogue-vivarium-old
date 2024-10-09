import { Game } from "../components/Game";
import { AppProvider, PageContainer, PageContainerToolbar } from "@toolpad/core";

const PageToolbar = () => {
  return (
    <PageContainerToolbar>
      <div>Experiments in building a simple rogue-lite in a virtual ecosystem</div>
    </PageContainerToolbar>
  );
}

export const RogueVivarium = () => {
  return (
    <AppProvider branding={{ title: 'Rogue Vivarium' }}>
      <PageContainer slots={{ toolbar: PageToolbar}}>
      <Game />
        <div> Controls: WASD to move</div>
      </PageContainer>
    </AppProvider>
  );
}

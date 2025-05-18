import PageContainer from '../layout/PageContainer';
import BreathingExercise from '../exercises/BreathingExercise';

const BreathingView = () => {
  return (
    <PageContainer title="Breathing Exercises" subtitle="Techniques to reduce stress and anxiety">
      <div className="max-w-3xl mx-auto">
        <BreathingExercise />
      </div>
    </PageContainer>
  );
};

export default BreathingView;

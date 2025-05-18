import PageContainer from '../layout/PageContainer';
import GratitudeJournal from './GratitudeJournal';

const GratitudeView = () => {
  return (
    <PageContainer title="Gratitude Journal" subtitle="Reflect on what you're thankful for">
      <div className="max-w-3xl mx-auto">
        <GratitudeJournal />
      </div>
    </PageContainer>
  );
};

export default GratitudeView;

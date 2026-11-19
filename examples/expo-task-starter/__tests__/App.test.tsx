import { act, fireEvent, render, screen, within } from '@testing-library/react-native';
import App from '../App';

const runTitle = 'Run the app on your phone';
const completeTitle = 'Mark a task complete';
const exploreTitle = 'Explore the starter code';

test('starts with three tasks and their accessible completion states', async () => {
  await render(<App />);
  expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  expect(screen.getByRole('checkbox', { name: runTitle })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: completeTitle })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: exploreTitle })).toBeChecked();
  expect(screen.getByRole('header', { name: 'Task starter' })).toBeOnTheScreen();
});

test('toggles a task in both directions and updates its visible status', async () => {
  await render(<App />);
  await fireEvent.press(screen.getByRole('checkbox', { name: runTitle }));
  const completedTask = screen.getByRole('checkbox', { name: runTitle });
  expect(completedTask).toBeChecked();
  expect(within(completedTask).getByText('Completed')).toBeOnTheScreen();
  await fireEvent.press(completedTask);
  const activeTask = screen.getByRole('checkbox', { name: runTitle });
  expect(activeTask).not.toBeChecked();
  expect(within(activeTask).getByText('Not completed')).toBeOnTheScreen();
});

test('updates tasks independently, including an initially completed task', async () => {
  await render(<App />);
  await fireEvent.press(screen.getByRole('checkbox', { name: exploreTitle }));
  await fireEvent.press(screen.getByRole('checkbox', { name: completeTitle }));
  expect(screen.getByRole('checkbox', { name: runTitle })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: completeTitle })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: exploreTitle })).not.toBeChecked();
});

test('keeps every toggle when consecutive presses are batched', async () => {
  await render(<App />);
  const firstTask = screen.getByRole('checkbox', { name: runTitle });
  const secondTask = screen.getByRole('checkbox', { name: completeTitle });
  await act(async () => {
    await fireEvent.press(firstTask);
    await fireEvent.press(firstTask);
    await fireEvent.press(firstTask);
    await fireEvent.press(secondTask);
    await fireEvent.press(secondTask);
  });
  expect(screen.getByRole('checkbox', { name: runTitle })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: completeTitle })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: exploreTitle })).toBeChecked();
});

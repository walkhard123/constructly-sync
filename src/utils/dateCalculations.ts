export const calculateEndDate = (startDate: Date, duration: number): Date => {
  let currentDate = new Date(startDate);
  let daysCount = 0;
  
  while (daysCount < duration) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate.getDay() !== 0) { // Skip Sundays
      daysCount++;
    }
  }
  
  return currentDate;
};

export const calculateDuration = (startDate: Date, endDate: Date): number => {
  let duration = 0;
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0) { // Skip Sundays
      duration++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return duration;
};
function Get_TimeLeft(date) {
  const Today = new Date();

  const Date_To_Travel = new Date(date);

  const timeleft = Date_To_Travel.getTime() - Today.getTime();

  const daysleft = Math.ceil(timeleft / (1000 * 3600 * 24)); //// 1 Mint ==>> 60 Second's ,  1 Second's  ==>> 1000 MS ,   1 Hour ==>> 60 Mint ==>> 60 * 60 = 3600 Second's .

  document.getElementById(
    "TimeLeft"
  ).innerHTML = ` Day's Left Is ::  ${daysleft} `;

  alert(" complete Get_TimeLeft() method  ");

  return daysleft;
}

export { Get_TimeLeft };

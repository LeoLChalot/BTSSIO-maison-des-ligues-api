/**
 * Retrieves orders within a specified date range.
 *
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @return {Array} An array of orders within the specified date range.
 */
const getOrdersByDateRange = (startDate, endDate) => {

  // Filter orders based on the date range
  const filteredOrders = commandesList.filter(order => {
     const orderDate = new Date(order.date);
     return orderDate >= startDate && orderDate <= endDate;
  });

  return filteredOrders;
}

/**
 * Calculates the percentage change in orders between the current week and the previous week.
 *
 * @param {Array} commandesList - The list of orders.
 * @return {Object} statistics - An object containing the total number of orders, the number of orders from the previous week, the number of orders from the current week, and the percentage change.
 */
const calculatePercentageChange = (commandesList) => {
  // Define week calculation function (assuming 'getWeek' is available)
  const getWeek = (date) => {
     const oneJan = new Date(date.getFullYear(), 0, 1);
     return Math.ceil((((date - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
  };
  const current_week = getWeek(new Date())
  // Initialize empty lists
  let prevWeekOrders = [];
  let currentWeekOrders = [];

  // Iterate through orders and separate them by week
  for (const commande of commandesList) {
     const orderDate = new Date(commande.date);
     const weekNumber = getWeek(orderDate);


     console.log(weekNumber)
     console.log(commande)

     if (weekNumber === current_week) {
        currentWeekOrders.push(commande);
     } else if (weekNumber === current_week - 1) {
        prevWeekOrders.push(commande);
     }
  }

  // Calculate percentage change
  const prevWeekCount = prevWeekOrders.length > 0 ? prevWeekOrders.length : 0;
  const currentWeekCount = currentWeekOrders.length;
  const percentageChange = ((currentWeekCount - prevWeekCount) / prevWeekCount) * 100;

  console.log({ "percentageChange": percentageChange })
  console.log({ "prevWeekCount": prevWeekCount })
  console.log({ "currentWeekCount": currentWeekCount })

  const statistics = {
     totalCommandes: commandesList.length,
     nombreCommandesSemainePrecedente: prevWeekCount,
     nombreCommandesSemaineActuelle: currentWeekCount,
     pourcentage: parseInt(percentageChange.toFixed(0)),
  }

  return statistics;
}


const getCategoryById = async (connexion, id) => {
  try {
     const findById = {
        id: id,
     };

     // console.log({"findById": findById});

     const result = await CATEGORIE_DAO.find(connexion, findById);

     // console.log(result);

     if (result[0].length == 0) {
        return { id: id, nom: 'Categorie non trouvée' };
     }

     return { id: id, nom: result[0][0].nom };

  } catch (error) {
     console.error('Error connecting shop:', error);
     throw error;
  }
};

module.exports = {
   getOrdersByDateRange,
   calculatePercentageChange,
   getCategoryById
}
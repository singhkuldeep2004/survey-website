app.post('/complete-survey', authenticateJWT, (req, res) => {
    const { surveyId, timeSpent } = req.body;
    let points = 0;
  
    if (surveyId === '1') {
      points = 99;
    } else if (surveyId === '2') {
      points = 11;
    } else if (surveyId === '3') {
      points = 3;
    }
  
    // Logic to add points to the user's account would go here
  
    res.json({ message: `Survey completed! You earned ${points} points.` });
  });
  
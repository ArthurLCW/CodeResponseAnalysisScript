import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as ols

# Create a DataFrame with example data
data = pd.DataFrame({
    'BloodPressure': [120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175],
    'Dosage': [10, 20, 30, 10, 20, 30, 10, 20, 30, 10, 20, 30],
    'ActivityLevel': ['Low', 'Low', 'Low', 'Medium', 'Medium', 'Medium', 'High', 'High', 'High', 'High', 'High', 'High']
})

# Convert 'ActivityLevel' into a categorical variable with a specific order
data['ActivityLevel'] = pd.Categorical(data['ActivityLevel'], categories=['Low', 'Medium', 'High'], ordered=True)

# Fit the regression model with an interaction term
model = ols.ols('BloodPressure ~ Dosage * C(ActivityLevel)', data=data).fit()

# Display the regression results
print(model.summary())

import statsmodels.api as sm
from statsmodels.formula.api import ols
import pandas as pd

# Example data
data = {
    'Diet': ['Vegan', 'Vegan', 'Vegan', 'Vegan', 'Meat-based', 'Meat-based', 'Meat-based', 'Meat-based'],
    'Exercise': ['Regular', 'Regular', 'None', 'None', 'Regular', 'Regular', 'None', 'None'],
    'Cholesterol': [180, 190, 200, 210, 220, 230, 240, 250]
}

# Convert data to DataFrame
df = pd.DataFrame(data)

# Perform One-Way ANOVA for Diet
model_diet = ols('Cholesterol ~ C(Diet)', data=df).fit()
anova_results_diet = sm.stats.anova_lm(model_diet, typ=2)
print("One-Way ANOVA for Diet:")
print(anova_results_diet)

# Perform One-Way ANOVA for Exercise
model_exercise = ols('Cholesterol ~ C(Exercise)', data=df).fit()
anova_results_exercise = sm.stats.anova_lm(model_exercise, typ=2)
print("\nOne-Way ANOVA for Exercise:")
print(anova_results_exercise)

# Perform Two-Way ANOVA
model = ols('Cholesterol ~ C(Diet) + C(Exercise) + C(Diet):C(Exercise)', data=df).fit()
anova_results = sm.stats.anova_lm(model, typ=2)

print(anova_results)

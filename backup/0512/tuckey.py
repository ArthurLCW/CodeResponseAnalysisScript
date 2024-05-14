import pandas as pd
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# Create the dataset
data = {
    'Study_Method': ['A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'C'],
    'Test_Scores': [83, 87, 85, 90, 88, 78, 82, 80, 79, 81, 91, 92, 93, 88, 89]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Conduct ANOVA
model = ols('Test_Scores ~ C(Study_Method)', data=df).fit()
anova_results = sm.stats.anova_lm(model, typ=2)  # typ=2 for ANOVA with sum of squares type II
print("One-Way ANOVA for Study Method:")
print(anova_results)

# Perform Tukey's HSD test
tukey = pairwise_tukeyhsd(endog=df['Test_Scores'], groups=df['Study_Method'], alpha=0.05)
print("\nTukey's Honestly Significant Difference (HSD) Test:")
print(tukey)

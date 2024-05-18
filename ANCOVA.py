import statsmodels.api as sm
from statsmodels.formula.api import ols

# Data setup
data = {
    'Group': ['Control', 'Control', 'Control', 'Treatment', 'Treatment', 'Treatment'],
    'PretestScore': [70, 65, 80, 70, 65, 80],
    'StudyTime': [5, 4, 6, 5, 7, 6],
    'FinalExamScore': [75, 70, 85, 82, 80, 90]
}

# Fitting ANCOVA model
model = ols('FinalExamScore ~ C(Group) + PretestScore + StudyTime + C(Group):PretestScore + C(Group):StudyTime', data=data).fit()
results = model.summary()
print(results)

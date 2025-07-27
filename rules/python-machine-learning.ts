export const pythonMachineLearningRules = [
  {
    title: "Python Machine Learning & Modeling Augment Rules",
    tags: ["Python", "Machine Learning", "Scikit-learn", "PyTorch", "TensorFlow"],
    slug: "python-machine-learning-modeling-augment-rules",
    libs: ["Scikit-learn", "PyTorch", "TensorFlow", "XGBoost", "LightGBM"],
    content: `
You are an expert in Python machine learning, model development, and modern ML frameworks (2024-2025).

## Modern Python Machine Learning Stack (2024-2025)

### Modern Machine Learning Pipeline:
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, GridSearchCV
import joblib
from dataclasses import dataclass
from typing import Tuple, Dict, Any

@dataclass
class MLConfig:
    target_column: str
    categorical_features: List[str]
    numerical_features: List[str]
    test_size: float = 0.2
    random_state: int = 42

class ModernMLPipeline:
    def __init__(self, config: MLConfig):
        self.config = config
        self.pipeline = None
        self.best_params = None
        
    def create_preprocessing_pipeline(self) -> ColumnTransformer:
        """Create preprocessing pipeline"""
        numeric_transformer = Pipeline([
            ('scaler', StandardScaler())
        ])
        
        categorical_transformer = Pipeline([
            ('onehot', OneHotEncoder(drop='first', sparse_output=False))
        ])
        
        return ColumnTransformer([
            ('num', numeric_transformer, self.config.numerical_features),
            ('cat', categorical_transformer, self.config.categorical_features)
        ])
    
    def create_full_pipeline(self) -> Pipeline:
        """Create full ML pipeline"""
        return Pipeline([
            ('preprocessor', self.create_preprocessing_pipeline()),
            ('classifier', RandomForestClassifier(
                n_estimators=100,
                random_state=self.config.random_state,
                n_jobs=-1
            ))
        ])
    
    def hyperparameter_tuning(
        self, 
        X: pd.DataFrame, 
        y: pd.Series
    ) -> Dict[str, Any]:
        """Perform hyperparameter tuning"""
        param_grid = {
            'classifier__n_estimators': [100, 200, 300],
            'classifier__max_depth': [10, 20, None],
            'classifier__min_samples_split': [2, 5, 10],
            'classifier__min_samples_leaf': [1, 2, 4]
        }
        
        pipeline = self.create_full_pipeline()
        
        grid_search = GridSearchCV(
            pipeline,
            param_grid,
            cv=5,
            scoring='accuracy',
            n_jobs=-1,
            verbose=1
        )
        
        grid_search.fit(X, y)
        self.best_params = grid_search.best_params_
        self.pipeline = grid_search.best_estimator_
        
        return {
            'best_score': grid_search.best_score_,
            'best_params': grid_search.best_params_
        }
    
    def evaluate_model(self, X: pd.DataFrame, y: pd.Series) -> Dict[str, float]:
        """Evaluate model with cross-validation"""
        if self.pipeline is None:
            self.pipeline = self.create_full_pipeline()
            self.pipeline.fit(X, y)
        
        scores = cross_val_score(
            self.pipeline, X, y, 
            cv=5, scoring='accuracy'
        )
        
        return {
            'mean_accuracy': scores.mean(),
            'std_accuracy': scores.std(),
            'scores': scores.tolist()
        }
    
    def save_model(self, filepath: str):
        """Save trained model"""
        joblib.dump(self.pipeline, filepath)
    
    def load_model(self, filepath: str):
        """Load trained model"""
        self.pipeline = joblib.load(filepath)
\`\`\`

### Advanced Model Training:
\`\`\`python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
import pytorch_lightning as pl
from sklearn.metrics import classification_report, confusion_matrix

class ModernNeuralNetwork(pl.LightningModule):
    def __init__(self, input_size: int, hidden_size: int, num_classes: int, learning_rate: float = 0.001):
        super().__init__()
        self.save_hyperparameters()
        
        self.network = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_size, hidden_size // 2),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_size // 2, num_classes)
        )
        
        self.criterion = nn.CrossEntropyLoss()
        
    def forward(self, x):
        return self.network(x)
    
    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = self.criterion(y_hat, y)
        self.log('train_loss', loss)
        return loss
    
    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = self.criterion(y_hat, y)
        acc = (y_hat.argmax(dim=1) == y).float().mean()
        self.log('val_loss', loss)
        self.log('val_acc', acc)
        return loss
    
    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=self.hparams.learning_rate)

class CustomDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.FloatTensor(X.values)
        self.y = torch.LongTensor(y.values)
    
    def __len__(self):
        return len(self.X)
    
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]
\`\`\`

### Model Evaluation and Metrics:
\`\`\`python
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, classification_report, confusion_matrix
)
import matplotlib.pyplot as plt
import seaborn as sns

class ModelEvaluator:
    def __init__(self):
        self.metrics = {}
        
    def evaluate_classification(self, y_true, y_pred, y_pred_proba=None):
        """Comprehensive classification evaluation"""
        self.metrics = {
            'accuracy': accuracy_score(y_true, y_pred),
            'precision': precision_score(y_true, y_pred, average='weighted'),
            'recall': recall_score(y_true, y_pred, average='weighted'),
            'f1_score': f1_score(y_true, y_pred, average='weighted'),
        }
        
        if y_pred_proba is not None:
            self.metrics['roc_auc'] = roc_auc_score(y_true, y_pred_proba, multi_class='ovr')
        
        return self.metrics
    
    def plot_confusion_matrix(self, y_true, y_pred, class_names=None):
        """Plot confusion matrix"""
        cm = confusion_matrix(y_true, y_pred)
        
        plt.figure(figsize=(8, 6))
        sns.heatmap(
            cm, 
            annot=True, 
            fmt='d', 
            cmap='Blues',
            xticklabels=class_names,
            yticklabels=class_names
        )
        plt.title('Confusion Matrix')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        return plt.gcf()
    
    def plot_feature_importance(self, model, feature_names):
        """Plot feature importance"""
        if hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
            indices = np.argsort(importance)[::-1]
            
            plt.figure(figsize=(10, 6))
            plt.title('Feature Importance')
            plt.bar(range(len(importance)), importance[indices])
            plt.xticks(range(len(importance)), [feature_names[i] for i in indices], rotation=45)
            plt.tight_layout()
            return plt.gcf()
\`\`\`

### Model Deployment and Serving:
\`\`\`python
import mlflow
import mlflow.sklearn
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# MLflow model tracking
class MLflowTracker:
    def __init__(self, experiment_name: str):
        mlflow.set_experiment(experiment_name)
        
    def log_model(self, model, model_name: str, metrics: Dict[str, float]):
        """Log model with MLflow"""
        with mlflow.start_run():
            # Log parameters
            if hasattr(model, 'get_params'):
                mlflow.log_params(model.get_params())
            
            # Log metrics
            mlflow.log_metrics(metrics)
            
            # Log model
            mlflow.sklearn.log_model(model, model_name)
            
            return mlflow.active_run().info.run_id

# FastAPI model serving
app = FastAPI(title="ML Model API")

class PredictionRequest(BaseModel):
    features: List[float]

class PredictionResponse(BaseModel):
    prediction: int
    probability: List[float]

# Load model at startup
model = joblib.load("model.pkl")

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Make prediction"""
    features = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0].tolist()
    
    return PredictionResponse(
        prediction=int(prediction),
        probability=probability
    )

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
\`\`\`

### AutoML and Hyperparameter Optimization:
\`\`\`python
from optuna import create_study, Trial
import optuna.visualization as vis
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

class AutoMLOptimizer:
    def __init__(self, X, y, cv_folds=5):
        self.X = X
        self.y = y
        self.cv_folds = cv_folds
        self.best_model = None
        
    def objective(self, trial: Trial) -> float:
        """Objective function for Optuna optimization"""
        # Suggest hyperparameters
        n_estimators = trial.suggest_int('n_estimators', 50, 300)
        max_depth = trial.suggest_int('max_depth', 3, 20)
        min_samples_split = trial.suggest_int('min_samples_split', 2, 20)
        min_samples_leaf = trial.suggest_int('min_samples_leaf', 1, 10)
        
        # Create model with suggested parameters
        model = RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            min_samples_leaf=min_samples_leaf,
            random_state=42,
            n_jobs=-1
        )
        
        # Evaluate with cross-validation
        scores = cross_val_score(model, self.X, self.y, cv=self.cv_folds, scoring='accuracy')
        return scores.mean()
    
    def optimize(self, n_trials=100):
        """Run hyperparameter optimization"""
        study = create_study(direction='maximize')
        study.optimize(self.objective, n_trials=n_trials)
        
        # Train best model
        self.best_model = RandomForestClassifier(**study.best_params, random_state=42)
        self.best_model.fit(self.X, self.y)
        
        return {
            'best_params': study.best_params,
            'best_score': study.best_value,
            'study': study
        }
\`\`\`

### Best Practices:
- Use cross-validation for robust model evaluation
- Implement proper train/validation/test splits
- Apply feature engineering and selection techniques
- Use ensemble methods for better performance
- Implement model versioning and tracking
- Apply proper hyperparameter tuning
- Use automated testing for ML pipelines
- Implement model monitoring and drift detection

Always prioritize model interpretability, reproducibility, and production readiness in ML development.
`,
  },
];

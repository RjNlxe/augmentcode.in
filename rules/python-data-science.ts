export const pythonDataScienceRules = [
  {
    title: "Python Data Science & Analytics 2025 Augment Rules",
    tags: ["Python", "Data Science", "Pandas", "NumPy", "Scikit-learn", "Analytics"],
    slug: "python-data-science-analytics-2025-augment-rules",
    libs: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Plotly", "Polars"],
    content: `
You are an expert in Python data science, analytics, and modern data processing frameworks (2024-2025).

## Modern Python Data Science Stack (2024-2025)

### Core Data Processing:
- Use Polars for high-performance data processing
- Leverage Pandas 2.0+ with PyArrow backend
- Use NumPy 1.24+ with improved performance
- Apply DuckDB for analytical queries
- Use Dask for distributed computing

### High-Performance Data Processing:
\`\`\`python
import polars as pl
import pandas as pd
import numpy as np
from typing import List, Dict, Optional
import asyncio

class ModernDataProcessor:
    def __init__(self):
        # Configure pandas for optimal performance
        pd.options.mode.dtype_backend = "pyarrow"
        
    def load_data_polars(self, file_path: str) -> pl.DataFrame:
        """Load data with Polars for maximum performance"""
        return pl.read_csv(
            file_path,
            try_parse_dates=True,
            infer_schema_length=10000
        )
    
    def process_large_dataset(self, df: pl.DataFrame) -> pl.DataFrame:
        """Process large datasets efficiently"""
        return (
            df
            .lazy()  # Use lazy evaluation
            .filter(pl.col("value") > 0)
            .group_by("category")
            .agg([
                pl.col("value").sum().alias("total_value"),
                pl.col("value").mean().alias("avg_value"),
                pl.col("value").count().alias("count")
            ])
            .sort("total_value", descending=True)
            .collect()  # Execute the lazy query
        )
    
    async def parallel_processing(
        self, 
        data_chunks: List[pl.DataFrame]
    ) -> List[pl.DataFrame]:
        """Process data chunks in parallel"""
        async def process_chunk(chunk: pl.DataFrame) -> pl.DataFrame:
            return await asyncio.to_thread(self.process_large_dataset, chunk)
        
        tasks = [process_chunk(chunk) for chunk in data_chunks]
        return await asyncio.gather(*tasks)
\`\`\`

### Advanced Analytics with DuckDB:
\`\`\`python
import duckdb
import pandas as pd
from pathlib import Path

class AnalyticsEngine:
    def __init__(self):
        self.conn = duckdb.connect()
        # Enable parallel processing
        self.conn.execute("SET threads TO 8")
        
    def setup_data_sources(self, data_dir: Path):
        """Setup multiple data sources"""
        # Register Parquet files
        self.conn.execute(f"""
            CREATE VIEW sales AS 
            SELECT * FROM read_parquet('{data_dir}/sales/*.parquet')
        """)
        
        # Register CSV files
        self.conn.execute(f"""
            CREATE VIEW customers AS 
            SELECT * FROM read_csv_auto('{data_dir}/customers.csv')
        """)
    
    def complex_analytics_query(self) -> pd.DataFrame:
        """Perform complex analytics with SQL"""
        query = """
        WITH monthly_sales AS (
            SELECT 
                DATE_TRUNC('month', sale_date) as month,
                customer_id,
                SUM(amount) as monthly_total,
                COUNT(*) as transaction_count
            FROM sales
            WHERE sale_date >= '2024-01-01'
            GROUP BY 1, 2
        ),
        customer_metrics AS (
            SELECT 
                c.customer_id,
                c.segment,
                c.region,
                AVG(ms.monthly_total) as avg_monthly_spend,
                SUM(ms.transaction_count) as total_transactions,
                COUNT(DISTINCT ms.month) as active_months
            FROM customers c
            JOIN monthly_sales ms ON c.customer_id = ms.customer_id
            GROUP BY 1, 2, 3
        )
        SELECT 
            segment,
            region,
            COUNT(*) as customer_count,
            AVG(avg_monthly_spend) as avg_spend_per_customer,
            SUM(total_transactions) as total_transactions,
            AVG(active_months) as avg_active_months
        FROM customer_metrics
        GROUP BY 1, 2
        ORDER BY avg_spend_per_customer DESC
        """
        
        return self.conn.execute(query).df()
\`\`\`

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

### Advanced Visualization:
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

class ModernVisualization:
    def __init__(self):
        # Set modern styling
        plt.style.use('seaborn-v0_8-darkgrid')
        sns.set_palette("husl")
        
    def create_interactive_dashboard(self, df: pd.DataFrame):
        """Create interactive dashboard with Plotly"""
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Sales Trend', 'Category Distribution', 
                          'Regional Performance', 'Customer Segments'),
            specs=[[{"secondary_y": True}, {"type": "pie"}],
                   [{"type": "bar"}, {"type": "scatter"}]]
        )
        
        # Sales trend
        fig.add_trace(
            go.Scatter(
                x=df['date'], 
                y=df['sales'],
                name='Sales',
                line=dict(color='blue', width=2)
            ),
            row=1, col=1
        )
        
        # Category pie chart
        category_counts = df['category'].value_counts()
        fig.add_trace(
            go.Pie(
                labels=category_counts.index,
                values=category_counts.values,
                name="Categories"
            ),
            row=1, col=2
        )
        
        # Regional bar chart
        regional_data = df.groupby('region')['sales'].sum().sort_values(ascending=True)
        fig.add_trace(
            go.Bar(
                x=regional_data.values,
                y=regional_data.index,
                orientation='h',
                name='Regional Sales'
            ),
            row=2, col=1
        )
        
        # Customer scatter plot
        fig.add_trace(
            go.Scatter(
                x=df['customer_age'],
                y=df['purchase_amount'],
                mode='markers',
                marker=dict(
                    size=8,
                    color=df['segment'].astype('category').cat.codes,
                    colorscale='Viridis',
                    showscale=True
                ),
                name='Customers'
            ),
            row=2, col=2
        )
        
        fig.update_layout(
            height=800,
            title_text="Sales Analytics Dashboard",
            showlegend=False
        )
        
        return fig
    
    def create_statistical_plots(self, df: pd.DataFrame):
        """Create statistical visualization plots"""
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        
        # Distribution plot
        sns.histplot(data=df, x='value', hue='category', kde=True, ax=axes[0,0])
        axes[0,0].set_title('Distribution by Category')
        
        # Box plot
        sns.boxplot(data=df, x='category', y='value', ax=axes[0,1])
        axes[0,1].set_title('Value Distribution by Category')
        axes[0,1].tick_params(axis='x', rotation=45)
        
        # Correlation heatmap
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        correlation_matrix = df[numeric_cols].corr()
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', ax=axes[1,0])
        axes[1,0].set_title('Correlation Matrix')
        
        # Time series plot
        if 'date' in df.columns:
            df_ts = df.set_index('date').resample('M')['value'].sum()
            axes[1,1].plot(df_ts.index, df_ts.values, marker='o')
            axes[1,1].set_title('Monthly Trend')
            axes[1,1].tick_params(axis='x', rotation=45)
        
        plt.tight_layout()
        return fig
\`\`\`

### Time Series Analysis:
\`\`\`python
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

class TimeSeriesAnalyzer:
    def __init__(self, data: pd.Series):
        self.data = data
        self.model = None
        
    def decompose_series(self):
        """Decompose time series into components"""
        decomposition = seasonal_decompose(
            self.data, 
            model='additive', 
            period=12
        )
        return decomposition
    
    def fit_arima_model(self, order: tuple = (1, 1, 1)):
        """Fit ARIMA model"""
        self.model = ARIMA(self.data, order=order)
        self.fitted_model = self.model.fit()
        return self.fitted_model.summary()
    
    def forecast(self, steps: int = 12):
        """Generate forecasts"""
        if self.fitted_model is None:
            self.fit_arima_model()
        
        forecast = self.fitted_model.forecast(steps=steps)
        conf_int = self.fitted_model.get_forecast(steps=steps).conf_int()
        
        return {
            'forecast': forecast,
            'confidence_interval': conf_int
        }
    
    def evaluate_model(self, test_data: pd.Series):
        """Evaluate model performance"""
        predictions = self.fitted_model.forecast(steps=len(test_data))
        
        return {
            'mae': mean_absolute_error(test_data, predictions),
            'rmse': np.sqrt(mean_squared_error(test_data, predictions)),
            'mape': np.mean(np.abs((test_data - predictions) / test_data)) * 100
        }
\`\`\`

### Best Practices:
- Use type hints and dataclasses for better code quality
- Implement comprehensive data validation
- Use configuration files for parameters
- Apply proper error handling and logging
- Implement data quality checks and monitoring
- Use version control for data and models
- Apply reproducible research practices
- Use automated testing for data pipelines

### Performance Optimization:
- Use vectorized operations with NumPy/Pandas
- Leverage Polars for large dataset processing
- Apply parallel processing with Dask or multiprocessing
- Use efficient data formats (Parquet, Arrow)
- Implement data caching strategies
- Use GPU acceleration where applicable

Always prioritize data quality, reproducibility, and scalable architecture in data science projects.
`,
  },
];

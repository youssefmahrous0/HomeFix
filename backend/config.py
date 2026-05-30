from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    AI_PROVIDER: str = "openai"
    OPENROUTER_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    COHERE_API_KEY: str = ""
    OPENROUTER_MODEL: str = "openai/gpt-4o-mini"
    CLAUDE_MODEL: str = "claude-3-5-sonnet-20241022"
    COHERE_MODEL: str = "command-r-plus"
    MAX_TOKENS: int = 1024
    MAX_CONVERSATION_HISTORY: int = 20

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
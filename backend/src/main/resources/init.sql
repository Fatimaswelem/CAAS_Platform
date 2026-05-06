CREATE TABLE users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    email-hash    VARCHAR(64) UNIQUE NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    role        ENUM('student', 'instructor') DEFAULT 'student',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE submissions (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    source_code TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_submissions_user_id (user_id)
);

CREATE TABLE results (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    submission_id   BIGINT UNIQUE NOT NULL,
    token_list      JSON,
    ast_output      JSON,
    error_message   TEXT,
    status          ENUM('success', 'lexer_error', 'parser_error') NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);
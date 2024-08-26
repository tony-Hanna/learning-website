
CREATE TABLE PhishingTemplates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

--@block
SELECT * FROM phishingtemplates

--@block
SELECT * FROM Attacks
--@block
INSERT INTO Attacks (name, description, category, severity_level, mitigation) VALUES 
('Man in the Middle', 'Attacker sits between 2 devices and intercepts communication', 'network', 'high', 'Use strong encryption, VPNs'),
('Phishing', 'Scam emails designed to trick users into providing personal information', 'social engineering', 'medium', 'Educate users, use email filtering'),
('SQL Injection', 'An attacker can execute malicious SQL code on a database', 'database', 'high', 'Use prepared statements, validate input');

--@block
CREATE TABLE answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    answer_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);
--@block
SELECT * FROM questions
--@block

INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(3, 'A phishing attack involves stealing passwords through emails.', 1),
(3, 'A phishing attack is a type of malware.', 0),
(3, 'A phishing attack involves hacking into servers.', 0),
(3, 'A phishing attack is done through physical means.', 0);


INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(4, 'A Man-in-the-Middle attack is done by intercepting communication between two parties.', 1),
(4, 'A Man-in-the-Middle attack is a type of virus.', 0),
(4, 'A Man-in-the-Middle attack involves physical access to the devices.', 0),
(4, 'A Man-in-the-Middle attack is an email scam.', 0);



--@block
INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(2,'man in the middle',FALSE),
(2,'zero day exploit',FALSE),
(2,'brute force',TRUE),
(2,'denial of service',FALSE)
--@block
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

 
--@block
INSERT INTO answers (question_id, answer_text, is_correct) VALUES

(5, 'A type of software designed to harm or exploit any programmable device or network.', 1),
(5, 'A legitimate software used for system optimization.', 0),
(5, 'An antivirus program.', 0),
(5, 'A firewall.', 0),


(6, 'Antivirus', 0),
(6, 'Firewall', 0),
(6, 'Trojan', 1),
(6, 'Router', 0),


(7, 'By installing antivirus software.', 1),
(7, 'By downloading software from untrusted sources.', 0),
(7, 'By not updating your operating system.', 0),
(7, 'By clicking on suspicious links.', 0);

--@block
DELETE FROM attempts

--@block

CREATE TABLE usersTest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50)
);
--@block
INSERT INTO usersTest (username, password) VALUES ('admin', 'password123'), ('user', 'userpass');
--@block
SELECT * FROM usersTest
--@block
CREATE TABLE emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fromName VARCHAR(255),
    fromEmail VARCHAR(255),
    replyTo VARCHAR(255),
    server VARCHAR(255),
    body TEXT,
    headers JSON,
    isPhishing BOOLEAN
);

INSERT INTO emails (fromName, fromEmail, replyTo, server, body, headers, isPhishing) VALUES
('letsdefend', 'no-reply@letsdefend.io', 'no-reply@letsdefend.io', 'mail.letsdefend.io', 'Dear User, welcome to letsdefend. We are glad to have you on board.', '{"date":"Mon, 1 Jan 2024 10:00:00 +0000","from":"letsdefend <no-reply@letsdefend.io>","to":"user@example.com","subject":"Welcome to letsdefend","return-path":"<no-reply@letsdefend.io>","domain-key":"example-domain-key","dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=letsdefend.io; s=selector1;","message-id":"<unique-message-id-1@letsdefend.io>","mime-version":"1.0","received":["from mail.letsdefend.io (mail.letsdefend.io [64.233.180.26]) by mail.receiver.com","from another.server.com (another.server.com [209.85.202.26]) by mail.letsdefend.io"],"x-spam-status":"No"}', 0),
('Support', 'support@anotherdomain.com', 'support@anotherdomain.com', 'mail.spammer.com', 'Dear User, your account has been compromised. Click here to secure it.', '{"date":"Tue, 2 Jan 2024 11:00:00 +0000","from":"Support <support@anotherdomain.com>","to":"user@example.com","subject":"Account Compromised","return-path":"<support@anotherdomain.com>","domain-key":"example-domain-key","dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=spammer.com; s=selector1;","message-id":"<unique-message-id-2@spammer.com>","mime-version":"1.0","received":["from mail.spammer.com (mail.spammer.com [230.85.202.26]) by mail.receiver.com","from malicious.server.com (malicious.server.com [92.233.180.26]) by mail.spammer.com"],"x-spam-status":"Yes"}', 1),
('Admin', 'admin@fakebank.com', 'support@fakebank.com', 'mail.fakebank.com', 'Dear User, please verify your account by providing your login details.', '{"date":"Wed, 3 Jan 2024 12:00:00 +0000","from":"Admin <admin@fakebank.com>","to":"user@example.com","subject":"Verify Your Account","return-path":"<admin@fakebank.com>","domain-key":"example-domain-key","dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=fakebank.com; s=selector1;","message-id":"<unique-message-id-3@fakebank.com>","mime-version":"1.0","received":["from mail.fakebank.com (mail.fakebank.com [32.25.54.200]) by mail.receiver.com","from another.malicious.com (another.malicious.com [44.55.66.11]) by mail.fakebank.com"],"x-spam-status":"Yes"}', 1);

--@block

CREATE TABLE usersMITM (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
--@block
CREATE TABLE user_progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT NOT NULL,
    attack_id INT NOT NULL,
    learned BOOLEAN DEFAULT FALSE,
    practiced BOOLEAN DEFAULT FALSE,
    lab_done BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id) REFERENCES users(id),
    FOREIGN KEY (attack_id) REFERENCES attacks(attack_id)
);

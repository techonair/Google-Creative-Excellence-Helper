CREATE TABLE GlobalCaseDetails (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AutoGeneratedCaseId NVARCHAR(50) UNIQUE,
    MasterId NVARCHAR(50),
    CaseId NVARCHAR(50),
    ReportedTime DATETIME,
    Sector NVARCHAR(50),
    FieldC NVARCHAR(50),
    FieldD NVARCHAR(50),
    FieldE NVARCHAR(50),
    FieldF NVARCHAR(50),
    FieldG NVARCHAR(50),
    FieldH NVARCHAR(50),
    FieldI NVARCHAR(50),
    AddedDate DATETIME,
    Status NVARCHAR(20),
    CompletedDate DATETIME
);


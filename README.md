## Start the server

```bash
docker-compose up -d
```

# app.sqlite structure
```sql
CREATE VIRTUAL TABLE "user" USING fts4 (
	"id" PRIMARY KEY,
	"avatar",
	"firstName",
	"lastName",
	"department",
	"function",
	"startwork",
	"email",
	"phone",
	"address",
	"publicationList",
	"domainList",
	"knowledgeList",
	"additional",
	"description",
	"_password",
);
CREATE VIRTUAL TABLE "activity" USING fts4 (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"type",
	"name",
	"place",
	"start",
	"end",
	"description",
	"conclusion",
	"tagList",
	"u_id",
	CONSTRAINT fk_u_id FOREIGN KEY (u_id) REFERENCES user(_id)
);
```

# import data from mongo via REST
```js
fetch("/user/").then(r=>r.json()).then(j=>j.map(u=>"INSERT INTO USER ("+Object.keys(u).join()+") VALUES ("+Object.keys(u).map(c=>"'"+(u[c].constructor==Array?u[c].join('\n'):u[c]).replace(/'/g,"''")+"'").join()+");").join('\n')).then(j=>console.log(j))
fetch("/activity/").then(r=>r.json()).then(j=>j.map(u=>"INSERT INTO ACTIVITY ("+Object.keys(u).map(c=>`'${c}'`).join()+") VALUES ("+Object.keys(u).map(c=>"'"+(u[c].constructor==Array?u[c].join('\n'):u[c]).replace(/'/g,"''")+"'").join()+");").join('\n')).then(j=>console.log(j))
```
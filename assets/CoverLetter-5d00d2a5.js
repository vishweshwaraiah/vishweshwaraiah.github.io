import{_ as w,r as s,o as g,a as i,c as d,b as e,t as a,d as r,e as C,M as k,w as I,v as x,F as D,f as T,p as S,g as j,I as L,P as f,h as M,i as b,j as P,D as A,k as J,l as B,u as V}from"./index-21bc273f.js";const F=o=>(S("data-v-71ab1a6a"),o=o(),j(),o),N={class:"cover_letter"},H={class:"flex-between"},O={class:"section_title"},R={class:"letter_content"},W={class:"letter_header"},E=F(()=>e("div",{class:"strong mb-2"},"To,",-1)),K={class:"mt-2 strong dear_name"},$={class:"letter_body"},z={class:"intro_desc mt-3 mb-2"},G={class:"expertise_desc mt-3 mb-2"},Q={class:"recent_projects mt-3 mb-2"},U={class:"passion_desc mt-3 mb-2"},Y={class:"final_words mt-3 mb-2"},q={class:"letter_footer from_developer mt-4 mb-2"},X={__name:"DeveloperLetter",props:{sectionTitle:{default:"Cover Letter",type:String},letterContent:{default:()=>{},type:Object}},setup(o){const t=o,n=s(""),l=s(""),p=s(""),u=s(""),_=s(""),v=s(""),m=s("");return g(()=>{n.value=t.letterContent.to_address,l.value=t.letterContent.intro_desc,p.value=t.letterContent.expertise_desc,u.value=t.letterContent.recent_projects,_.value=t.letterContent.passion_desc,v.value=t.letterContent.final_words,m.value=t.letterContent.from_developer}),(oe,h)=>(i(),d("div",N,[e("div",H,[e("h1",O,a(t.sectionTitle),1),r(C,{svgName:"user",size:"medium",fillColor:"var(--item-color)",hoverInverse:!0})]),r(k,{thickness:"2px"}),e("div",R,[e("div",W,[E,I(e("input",{class:"strong dear_name mb-2",type:"text","onUpdate:modelValue":h[0]||(h[0]=c=>n.value.to_name=c)},null,512),[[x,n.value.to_name,void 0,{trim:!0}]]),(i(!0),d(D,null,T(n.value.addr_lines,(c,y)=>(i(),d("span",{class:"d-block thin-text",key:y},a(c)+",",1))),128)),e("p",K,"Dear Mr/Mrs "+a(n.value.to_name)+",",1)]),e("div",$,[e("div",z,a(l.value),1),e("div",G,a(p.value),1),e("div",Q,a(u.value),1),e("div",U,a(_.value),1),e("div",Y,a(v.value),1)]),e("div",q,a(m.value),1)])]))}},Z=w(X,[["__scopeId","data-v-71ab1a6a"]]),ee={to_address:{to_name:"Dear Hiring Manager,",addr_lines:["Flat 12061, Building 1, Tower 2","Prestige Jindal City, Anchepalya","Near Parle Toll","Bengaluru - 560073"]},intro_desc:"I am writing to express my interest in the Full Stack Developer position at your company. I have 10 years of experience in developing and maintaining web applications using various technologies and frameworks.",expertise_desc:"As a full stack developer, I have expertise in both front-end and back-end development, as well as database management and deployment. Some of the skills and tools that I use include HTML, CSS, JavaScript, React Js, Vue Js, Node.js, MongoDB, AWS, Git, and Agile methodologies. I have successfully delivered several projects for clients across different domains and industries, such as e-commerce, education, healthcare, and social media.",recent_projects:"One of my recent projects was a web application for an online e-commerce platform that sells and delivers food. I was responsible for designing and implementing the entire application, from the user interface to the RESTful API and the database. I used React for the front-end, Java and Spring-boot for the back-end, Hibernate(JPA) with MySQL for the database, and AWS for the hosting and deployment. The application features a responsive design, a secure authentication system, a payment gateway integration, and a dashboard for tracking the progress and performance of the users. The project was completed on time and within budget, and received positive feedback from the client and the users.",passion_desc:"I am passionate about creating user-friendly, scalable, and reliable web applications that meet the needs and expectations of the customers. I am always eager to learn new technologies and best practices, and I enjoy working in a collaborative and agile environment. I believe that I can be a valuable asset to your team and contribute to the success of your projects.",final_words:"I would love to discuss this opportunity further with you and demonstrate some of my work samples. Please let me know if you are available for an interview. You can reach me at 7353333573/7353203573 or k.vishu@outlook.com. Thank you for your consideration.",from_developer:"Vishweshwarayya K J"},te="Senior Fullstack Developer",ae="Vishweshwarayya K J",se="Cover Letter",re={__name:"CoverLetter",setup(o){const t=s([]);return g(()=>{L(f)&&(t.value=f.contact)}),(n,l)=>(i(),M(P,{class:"cover_letter"},{sidebar:b(()=>[r(A),r(J,{devContact:t.value,sectionTitle:"Contact"},null,8,["devContact"])]),content:b(()=>[r(B,{title:ae,subtitle:te}),r(Z,{letterContent:V(ee),sectionTitle:se},null,8,["letterContent"])]),_:1}))}};export{re as default};

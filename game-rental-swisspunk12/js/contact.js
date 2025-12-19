(function(){
  const form = document.getElementById('contactForm');
  const result = document.getElementById('contactResult');
  // Zapier webhook (configured)
  const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/25757428/uaiauq4/';

  function postToZap(data){
    return fetch(ZAPIER_WEBHOOK,{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)
    });
  }

  if(form){
    const submitBtn = form.querySelector('button[type="submit"]');
    const controls = Array.from(form.querySelectorAll('input,textarea,button'));
    function setLoading(on){
      if(on){
        form.setAttribute('aria-busy','true');submitBtn.classList.add('loading');submitBtn.disabled=true;controls.forEach(c=>c.disabled=true);result.textContent='Sending...';
      } else {form.removeAttribute('aria-busy');submitBtn.classList.remove('loading');submitBtn.disabled=false;controls.forEach(c=>c.disabled=false);}
    }

    function showResult(text,type){
      result.textContent = text;result.classList.remove('error','success');if(type) result.classList.add(type);
      if(type==='success'){setTimeout(()=>{result.textContent='';result.classList.remove('success');},6000);}
    }

    function validate(){
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');
      const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if(!name.value.trim()) return {ok:false,field:name,msg:'Please enter your name.'};
      if(!email.value.trim()||!emailRe.test(email.value)) return {ok:false,field:email,msg:'Please enter a valid email.'};
      if(!message.value.trim()) return {ok:false,field:message,msg:'Please enter reservation details.'};
      return {ok:true};
    }

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const v = validate();
      if(!v.ok){result.textContent=v.msg;v.field.focus();form.classList.add('shake');setTimeout(()=>form.classList.remove('shake'),600);return}
      setLoading(true);
      const fd = new FormData(form);const payload = Object.fromEntries(fd.entries());payload.timestamp = new Date().toISOString();
      try{
        const res = await postToZap(payload);
        if(res.ok){ showResult('Reservation sent — we will contact you soon.','success'); form.reset(); setTimeout(()=>setLoading(false),600);} else {showResult('There was an error sending your request.','error'); setLoading(false);} 
      }catch(err){console.error(err);showResult('Network error. Try later.','error');setLoading(false)}
    });
  }
})();

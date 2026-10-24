const API = '/api/donations';
const fallbackDonations = [
 {id:1,foodName:'Fresh vegetable biryani',category:'Prepared meals',quantity:'12 meal boxes',donorName:'Green Leaf Kitchen',location:'T. Nagar, Chennai',pickupTime:'Today, 7:00 PM',expiryTime:'Today, 9:00 PM',notes:'Packed hygienically; vegetarian.',status:'Available'},
 {id:2,foodName:'Bread and buns',category:'Bakery',quantity:'30 pieces',donorName:'Sunrise Bakery',location:'Velachery, Chennai',pickupTime:'Today, 6:30 PM',expiryTime:'Today, 10:00 PM',notes:'Please collect in reusable crates.',status:'Available'},
 {id:3,foodName:'Fresh bananas',category:'Fruits',quantity:'8 kg',donorName:'City Market Stall 14',location:'Guindy, Chennai',pickupTime:'Today, 5:30 PM',expiryTime:'Today, 8:00 PM',notes:'Ripe, ready to distribute.',status:'Available'}
];
let donations = [];
const $ = (s) => document.querySelector(s);
const escapeHtml = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function emojiFor(category){return ({'Prepared meals':'🍱','Bakery':'🥖','Fruits':'🍌','Vegetables':'🥦','Groceries':'🛍️','Other':'🥫'})[category]||'🥗'}
function slug(category){return String(category||'').toLowerCase().replace(/[^a-z]+/g,'-')}
function showToast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('show'),3000)}
async function request(url, options={}){const res=await fetch(url,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});if(!res.ok){let msg='Something went wrong. Please try again.';try{msg=(await res.json()).message||msg}catch{}throw new Error(msg)}return res.status===204?null:res.json()}
async function loadDonations(){
 try {donations=await request(API)} catch(e){donations=[...fallbackDonations];showToast('Demo preview is shown. Start Spring Boot to enable API actions.')}
 render();
}
function render(){
 const term=$('#searchInput').value.trim().toLowerCase(), cat=$('#categoryFilter').value;
 const filtered=donations.filter(d=>(cat==='all'||d.category===cat)&&[d.foodName,d.donorName,d.location,d.category].some(v=>String(v||'').toLowerCase().includes(term)));
 $('#foodGrid').innerHTML=filtered.map(d=>`<article class="donation-card">
  <div class="donation-visual ${slug(d.category)}"><span>${emojiFor(d.category)}</span><span class="category-pill">${escapeHtml(d.category)}</span><span class="status-pill ${slug(d.status)}">${escapeHtml(d.status)}</span></div>
  <div class="donation-body"><h3>${escapeHtml(d.foodName)}</h3><div class="donor">Shared by ${escapeHtml(d.donorName)}</div>
   <div class="donation-meta"><div class="meta-row"><span class="meta-icon">📍</span>${escapeHtml(d.location)}</div><div class="meta-row"><span class="meta-icon">🕒</span>Pickup: ${escapeHtml(d.pickupTime||'Contact donor')}</div><div class="meta-row"><span class="meta-icon">⌛</span>Use before: ${escapeHtml(d.expiryTime||'Check with donor')}</div></div>
   <div class="donation-notes">${escapeHtml(d.notes||'Please contact the donor for details.')}</div><div class="card-bottom"><span class="quantity">${escapeHtml(d.quantity)}</span><button class="claim-btn" data-claim="${d.id}" ${d.status!=='Available'?'disabled':''}>${d.status==='Available'?'Claim food':d.status==='Claimed'?'Claimed':'Collected'} ${d.status==='Available'?'↗':''}</button></div>
  </div></article>`).join('');
 $('#emptyState').classList.toggle('hidden',filtered.length>0);
 $('#statDonations').textContent=donations.length;$('#statAvailable').textContent=donations.filter(d=>d.status==='Available').length;$('#heroCount').textContent=`${donations.length} donations`;
 document.querySelectorAll('[data-claim]').forEach(btn=>btn.addEventListener('click',()=>claimDonation(Number(btn.dataset.claim))));
}
async function claimDonation(id){
 try{const result=await request(`${API}/${id}/claim`,{method:'POST'});donations=donations.map(d=>d.id===id?result:d);render();showToast('Donation claimed! Please coordinate collection with the donor.')}
 catch(e){showToast(e.message.includes('Failed to fetch')?'Backend unavailable. Run the Spring Boot app to claim donations.':e.message)}
}
function openModal(){$('#donateModal').classList.remove('hidden');$('#formMessage').textContent='';document.body.style.overflow='hidden'}
function closeModal(){$('#donateModal').classList.add('hidden');document.body.style.overflow=''}
['#openDonateTop','#openDonateHero','#openDonateCta'].forEach(s=>$(s).addEventListener('click',openModal));
['#closeModal','#cancelDonate'].forEach(s=>$(s).addEventListener('click',closeModal));
$('#donateModal').addEventListener('click',e=>{if(e.target===$('#donateModal'))closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
$('#browseBtn').addEventListener('click',()=>$('#discover').scrollIntoView({behavior:'smooth'}));
$('#searchInput').addEventListener('input',render);$('#categoryFilter').addEventListener('change',render);
$('#donationForm').addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget;const data=Object.fromEntries(new FormData(form).entries());
 const button=$('#submitDonation');button.disabled=true;button.textContent='Publishing…';$('#formMessage').textContent='';
 try{const created=await request(API,{method:'POST',body:JSON.stringify(data)});donations.unshift(created);render();form.reset();closeModal();showToast('Your donation is live. Thank you for sharing good!');$('#discover').scrollIntoView({behavior:'smooth'})}
 catch(err){$('#formMessage').textContent=err.message.includes('Failed to fetch')?'Cannot connect to the backend. Start the Spring Boot app, then try again.':err.message}
 finally{button.disabled=false;button.textContent='Publish donation ↗'}
});
loadDonations();
